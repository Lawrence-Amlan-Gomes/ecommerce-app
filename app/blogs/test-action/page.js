import { createBlogPost } from "@/app/actions";

export default async function TestCreatePost() {
  const formData = new FormData();
  formData.append("title", "Test Post");
  formData.append("content", "This is a test post content");
  formData.append("author", "test@example.com");

  const result = await createBlogPost(formData);
  
  return (
    <div className="pt-[13%]">
      <h1>Test Create Post</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}