import AuthContext from './AuthContext';

function AppContext({ children }: { children: any }) {
  return <AuthContext>{children}</AuthContext>;
}

export default AppContext;
