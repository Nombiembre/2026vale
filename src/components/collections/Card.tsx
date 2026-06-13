import displayDate from "~/utils/displayTime";

interface DiaryCardProps {
  date: any
  cover: string | undefined
  href: string
  align?: 'center' | 'b' | 'b-l' | 'b-r' | 't' | 't-l' | 't-r' | 'l' | 'r'
}

const alignMap: Record<string, string> = {
  'center': 'object-center',
  'b':      'object-bottom',
  'b-l':    'object-left-bottom',
  'b-r':    'object-right-bottom',
  't':      'object-top',
  't-l':    'object-left-top',
  't-r':    'object-right-top',
  'l':      'object-left',
  'r':      'object-right',
}

const Card = ({ date, cover, href, align = 'center'  }: DiaryCardProps) => {
  // const { id, data } = post;
  // const transitionName = `post-img-${id}`;

  // getUTCMonth(): 0 = enero, 10 = noviembre
  // getUTCDate(): día del mes
  const d = new Date(date)

  const isSpecialDate =
    (d.getUTCMonth() === 10 && d.getUTCDate() === 7) || // 7 noviembre
    (d.getUTCMonth() === 9 && d.getUTCDate() === 22)

  return (
    <a
      href={href}
      className="group block relative bg-muted/20 overflow-hidden border border-muted/30 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Card image */}
      <div className="relative aspect-square overflow-hidden">
        {cover ? <img
          src={cover}
          width={500}
          height={500}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${alignMap[align]}`}
          srcSet={`${cover}?w=400 400w, ${cover}?w=600 600w`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        /> : <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}


        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card footer with day number */}
      <div className="relative px-6 py-3 bg-background/95 backdrop-blur-sm border-t border-muted/30">
        <div className="flex items-center justify-between">
          {/* Day number */}
          <div className="text-3xl md:text-5xl font-light text-primary/80 group-hover:text-primary transition-colors duration-300">
            {displayDate(date, { day: 'numeric' })}
          </div>


          {isSpecialDate && (
            <div className="flex flex-col items-center justify-center">
              <img src="/favicon.svg" alt="" className="w-6 h-6 text-primary/30 group-hover:text-primary/60 transition-colors duration-300" />
            </div>
          )}

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


