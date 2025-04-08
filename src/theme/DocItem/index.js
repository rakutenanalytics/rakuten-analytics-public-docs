import React from 'react';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  const { frontMatter } = props.content;

  return (
    <>
      {frontMatter.updated_version && (
        <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '0.9rem' }}>
          <strong>Last updated in </strong>
          <a href={frontMatter.changelog} >{frontMatter.updated_version}</a>
        </div>
      )}
      {frontMatter.added_version && (
        <div style={{ marginBottom: '20px', textAlign: 'left', fontSize: '0.9rem' }}>
          <strong>Added in </strong>
          <a href={frontMatter.changelog} >{frontMatter.added_version}</a>
        </div>
      )}
      <DocItem {...props} />
    </>
  );
}
