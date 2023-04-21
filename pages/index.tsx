// import Image from 'next/image'
// import { Inter } from 'next/font/google'

import { GetStaticProps, NextPage } from "next";
import homestyles from '../styles/Home.module.css';
import Head from "next/head";
import { getSortedPostData } from "@/lib/posts";
import Link from "next/link";

// const inter = Inter({ subsets: ['latin'] })

const Home = ({allPostData}:{
  allPostData: {
    date:string,title:string,id:string
  }[]
}) => { // NextPage : 리액트 컴포넌트 타입
  return (
   <div>
    <Head>
      <title>Your Name</title>
    </Head>
    <section className={homestyles.headingMd}>
      <p>[Your Self Introduction]</p>
      <p>[This is a website]</p>
    </section>
    <section className={`${homestyles.headingMd} ${homestyles.padding1px}`}>
      <h2 className={homestyles.headingLg}>Blog</h2>
      <ul className={homestyles.list}>
        {allPostData.map(({date,title,id}) => (
          <li className={homestyles.listItem} key={id}>
            <Link href={`/posts/${id}`}> /posts/ssg--ssr
              <span>{title}</span>
            </Link>
            <br />
            <small className={homestyles.lightText}>
              {date}
            </small>
          </li>
        )
        )}
      </ul>
    </section>
   </div>
  )
}


export default Home;

export const getStaticProps : GetStaticProps = async () => {
  const allPostData = getSortedPostData()
  return{
    props: {
      allPostData // date, title, id 이값들을 프리랜더링한다
    }
  }
}
//getStaticProps함수를 async로 export하면, getStaticProps에서 return 되는 props를 가지고 페이지를 pre-render한다. build time에 페이지를 렌더링 한다.
