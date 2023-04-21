import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
console.log('process.cwd() ->', process.cwd());
//C:\projects/app_nextjs_typescript_2023
console.log('postsDirectory ->', postsDirectory);
//C:\projects/app_nextjs_typescript_2023/posts


export function getSortedPostData(){
  const fileNames = fs.readdirSync(postsDirectory); // 동기식 Sync, 비동기신 async //posts폴더안에 있는 파일들을 배열형태로 불러온다
  console.log('fileNames ->', fileNames);
  //fileNames ['pre-rendering.md', 'ssg-ssr.md'] 
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/ , '' ); //\. : .  
    // id = 'pre-rendering'    id= 'ssg-ssr'
  const fullPath = path.join(postsDirectory, fileName);
  //C:\projects/app_nextjs_typescript_2023/posts/pre-rendering.md
  const fileContents = fs.readFileSync(fullPath, `utf-8`); //파일 내용
  const matterResult = matter(fileContents);//객체 변환
  console.log('matterResult ->', matterResult)
  return {
    id,
    ...(matterResult.data as {date:string; title:string})
  }
  
  }) //allPostsData

  return allPostsData.sort((a,b) => {//sort메소드는 문자열만 정렬이 된다 문자는 x
    if(a.date < b.date) {
      return 1
    }else{
      return -1
    }
  }) 
}//getsortedPostsData

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/.\md$/, '') //.md를 공백문자로 바꾼다 // id= `pre-rendering`  id= `ssg-ssr`
      }
    }
  });
}

export async function getPostData(id:string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // C:\projects/app_nextjs_typescript/posts/pre-rendering.md
  const fileContents = fs.readFileSync(fullPath, `utf-8`);
  const matterResult = matter(fileContents); //객체변환
  const processedContent = await remark()
                                 .use(html)
                                 .process(matterResult.content)  //remark는 markdown을 html로 변환
  const contentHtml = processedContent.toString();                                 
  return {
    id,
    contentHtml,
    ...(matterResult.data as {date:string, title:string})
  }
}