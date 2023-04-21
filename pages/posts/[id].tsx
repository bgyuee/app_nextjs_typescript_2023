import { getAllPostIds, getPostData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import homeStyles from '../../styles/Home.module.css';

export default function post({postData}:{
  postData: {
    title: string
    date: string
    contentHtml:string
  }
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div className={homeStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}} />
      </article>
    </div>
  )
}

export const getStaticPaths:GetStaticPaths = async() => {
  const paths = getAllPostIds()
  console.log('paths ->', paths)
  return {
    /*
    paths: [
          { params: {id: `pre-rendering`}},
          { parms: {id: `ssg-ssr`}}
          ],
          fallback:
     */
    paths,
    fallback: false
    // false 면 getStaticpaths로 리턴되지 않는 것은 모두 404 페이지가 뜬다
    //true 면 404로 뜨지 않고, fallback 페이지가 뜨게 된다.
  }
}

export const getStaticProps:GetStaticProps = async({params}) => {
  console.log('params', params); // { id: `pre-rendering` } { id: `ssg-ssr` }
  const postData = await getPostData(params?.id as string) //as : 타입스크립트가 추론하지않고 개발자가 이거의 타입은 string다라고 주장할수있다
  return {
    props: {
      postData
    }

  }
}