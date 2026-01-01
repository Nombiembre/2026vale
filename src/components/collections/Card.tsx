import displayDate from "~/utils/displayTime";

interface DiaryCardProps {
  date: any
  cover: string | undefined
  href: string
}

const Card = ({ date,cover, href }: DiaryCardProps) => {
  // const { id, data } = post;
  // const transitionName = `post-img-${id}`;

  return (
    <a
  href={href}
  className="group block relative bg-muted/20 overflow-hidden border border-muted/30 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
>
  {/* Card image */}
  <div className="relative aspect-square overflow-hidden">
    { cover ? <img
      src={cover}
      width={500}
      height={500}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    /> : <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> }
    

    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>

  {/* Card footer with day number */}
  <div className="relative px-6 py-3 bg-background/95 backdrop-blur-sm border-t border-muted/30">
    <div className="flex items-center justify-between">
      {/* Day number */}
      <div className="text-3xl md:text-5xl font-light text-primary/80 group-hover:text-primary transition-colors duration-300">
        {displayDate(date, { day: 'numeric'})}
      </div>

      {/* Month/year */}
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs uppercase text-muted-foreground">
          Editado: 
        </span>
        <span className="text-sm text-foreground/70 italic text-balance group-hover:text-foreground transition-colors duration-300">
          title
        </span>
      </div>
    </div>

    {/* Decorative underline */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>

  {/* Ornamental corner decoration */}
  <svg
    className="absolute top-2 right-2 w-6 h-6 text-primary/30 group-hover:text-primary/60 transition-colors duration-300"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
      fill="currentColor"
    />
  </svg>
</a>

  );
};

export default Card;


