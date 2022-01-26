export {}
interface Post {
  title: string // 可以使用 , 分隔，更标准的语法是 ; 分隔，这个分号也可以省略
  content: string
  subtitle?: string // 可选成员 相当于给 subtitle 标记类型为 string 或 undefined
  readonly summary: string // 只读成员
}

// 此函数入参隐性要求必须要有 title, content 属性
// 可以使用接口表现这种约束
function printPost (post: Post) {
  console.log(post.title);
  console.log(post.content);
}

printPost({
  title: 'title',
  content: 'content',
  summary: 'summary'
})

// 动态成员
interface Cache1 {
  [prop: string]: string
}

const cache: Cache1 = {}

cache.foo = 'value1'
cache.bar = 'value2'
