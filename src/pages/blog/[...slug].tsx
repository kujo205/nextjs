import { useRouter } from "next/router";

export default function BlogPost() {

    const router=useRouter();

    console.log(router.query.slug)
    
    return <div>
      <h2>Blog post</h2>
    </div>;
  }
  