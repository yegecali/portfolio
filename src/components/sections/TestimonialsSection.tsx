import Tag from "@/components/general/Tag";
import TestimonialDetails from "@/components/data-display/TestimonialDetails";
import Typography from "@/components/general/Typography";
import Container from "@/components/layout/Container";
import { usePortfolio } from "@/hooks/usePortfolio";

const TestimonialsSection = () => {
  const { testimonials } = usePortfolio();

  return (
    <Container
      id="testimonials"
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag label="Testimonials" />
        </div>
        <Typography variant="subtitle" className="max-w-xl text-center">
          Nice things people have said about me:
        </Typography>
      </div>

      <div className="flex gap-12 max-md:flex-col md:max-lg:flex-wrap">
        {testimonials?.map((testimonial, index) => (
          <TestimonialDetails key={index} {...testimonial} />
        ))}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
