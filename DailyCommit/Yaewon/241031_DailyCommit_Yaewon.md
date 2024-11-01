## 2024.10.31 데일리 커밋

## 1. 오늘 할 일
#### (1) 피그마 보면서 수정해야할 부분 수정
#### (2) Next.js 공부
## 0. Next.js를 사용하는 이유

### (1) 파일 이름

- `page.js` => Create a new page (e.g., `app/about/page.js` creates a `<your-domain>/about` page)
- `layout.js` => Create a new layout that wraps sibling and nested pages
- `not-found.js` => Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
- `error.js` => Fallback page for other errors (thrown by sibling pages or nested pages or layouts)
- `loading.js` => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
- `route.js` => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)
