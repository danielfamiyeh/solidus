/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import accountIcon from '@/assets/home/account/account.svg';
import { useMetamask } from '@/components/context/MetamaskContext';

const fields = [
  'id',
  'text',
  'image',
  'createdBy',
  'createdByName',
  'createdByAvatar',
  'createdAt',
  'updatedAt',
];

const getPostsFromIds = async (contract, postIds) =>
  await Promise.all(
    (postIds ?? []).map(async (postId) => {
      const postValues = await contract?.getPost(postId);

      return Object.assign(
        {},
        ...fields.map((field, i) => ({
          [field]: postValues[i]?.toString(),
        }))
      );
    })
  );

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { contract, account } = useMetamask();

  useEffect(() => {
    const init = async () => {
      const userPostIds = await contract?.getPostIds(account);
      const userPosts = await getPostsFromIds(contract, userPostIds);

      setPosts(
        [...userPosts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      );
    };

    init();
  }, [account, contract]);

  return (
    <div className="post-feed border-slate w-[100%] h-[calc(100%)] overflow-auto">
      {posts.map((post, i) => (
        <div
          key={`post-${i}`}
          className="post-feed__post-item bg-[var(--sol-bg-secondary)] border-black border-8 pt-4 my-4"
        >
          <Link
            href={`/profile/${post.createdBy}`}
            className="post-feed__post-item-meta flex items-center cursor-pointer px-2 my-2 hover:opacity-75 active:opacity-50"
          >
            <Image
              className="rounded-full mr-2"
              src={post.createdByAvatar || accountIcon}
              width={64}
              height={64}
              alt="Profile avatar"
            />
            <div>
              <h2 className="text-xl">{post.createdByName}</h2>
              <p className="text-sm text-black/50">{post.createdBy}</p>
              <small className="text-black/50">
                {moment.unix(post.createdAt).fromNow()}
              </small>
            </div>
          </Link>
          <div className="post-feed__post-feed-content p-2">
            <p className="my-2">{post.text}</p>
            {!!post.text && !!post.image && <hr className="mb-4" />}
            {!!post.image && (
              <img
                className="my-2 border-black border-2"
                src={post.image}
                alt="Post image"
              />
            )}
          </div>
          <hr className="mt-4 mb-6" />
        </div>
      ))}
    </div>
  );
}
