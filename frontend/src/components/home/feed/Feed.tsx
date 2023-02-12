/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { post1 } from '@/utils/data/Post';

export default function Feed() {
  return (
    <div className="post-feed border-slate border-4 w-screen lg:w-1/2 max-w-xl overflow-auto">
      {new Array(20).fill(null).map((_, i) => (
        <div key={`post-${i}`} className="post-feed__post-item">
          <div className="post-feed__post-item-meta flex items-center px-2 my-2">
            {
              <img
                className="rounded-full mr-2"
                src={post1.createdByAvatar}
                width={64}
                height={64}
                alt="Profile avatar"
              />
            }
            <div>
              <h2 className="text-xl">{post1.createdByName}</h2>
              <p className="text-sm text-black/75">{post1.createdByAddress}</p>
            </div>
          </div>
          <div className="post-feed__post-feed-content p-2">
            <p className="my-2">{post1.text}</p>
            {!!post1.text && !!post1.image && <hr className="mb-4" />}
            {!!post1.image && (
              <img
                className="rounded-md my-2"
                src={post1.image}
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
