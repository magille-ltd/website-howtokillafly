import Testimonial from './Testimonial';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      content: "Yesterday I was trying to get work done and one of these pesky f* bothered my deep work and set me back at least three hours. I finally managed to kill that f* after a long hunt. I love this directory, it is a testament to me winning that long arduous battle. 🪖",
      author: "- Me"
    },
    {
      id: 2,
      rating: 1,
      content: "Think of the flies",
      author: "- No one ever",
      reply: "HOW DARE YOU ONESTAR MY PROJECT?? I PUT A LOT OF WORK INTO THIS"
    },
    {
      id: 3,
      rating: 4,
      content: "I knew I had to do something. Bed time was approaching and I knew it would land on my face throughout the night. I just knew, if I were to type howtokillafly.com in my browser I would find a solution! And I did! I just knew. Five stars when you add more strategies so I can knew more!",
      author: "- Probably You",
      reply: "🤗 Thank you for the kind review! We will do everything we can to make sure you have the best experience possible and will keep working on our website. Please fivestar subscribe share like and review."
    },
    {
      id: 4,
      rating: 1,
      content: "I like diarrhea. I like how I can get it when a fly first visits the garbage bin or eats dog 💩 on the street, and then lands on my food. Please don't take that from me. One starred!!!",
      author: "- Fly Soy Boy",
      reply: "Eww. Get lost 😤"
    },
    {
      id: 5,
      rating: 5,
      content: "I like how this makes me a better human being and how my family looks up to me for solving the most pressing problem we have. One question though can you add a feature so we can share our progress? I'm done with like 562.4 flies but there's 238 more to go and i would like to post photos of me with my catch before there is no catch anymore if you know whatimean",
      author: "- Anonymous"
    }
  ];

  return (
    <div className="max-w-2xl space-y-6 max-w-3xl mx-auto">
      {testimonials.map((testimonial) => (
        <Testimonial key={testimonial.id} {...testimonial} />
      ))}
    </div>
  );
}

export default Testimonials;
