function Layout({ header, content }) {
  return (
    <div>
      <div>{header}</div>
      <div>{content}</div>
    </div>
  );
}

export default Layout;
