import React, { useMemo } from "react";
import Card from "./Card";

interface DiaryPreview {
  id: string;
  date: Date;
  cover?: string;
}

interface TestProps {
  collection: DiaryPreview[];
}

type Grouped = Map<number, Map<number, DiaryPreview[]>>;

const monthNameEs = (monthIndex: number) => {
  const name = new Date(2020, monthIndex, 1).toLocaleString("es-ES", {
    month: "long",
  });
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const Test: React.FC<TestProps> = ({ collection }) => {
  const grouped = useMemo(() => {
    const map: Grouped = new Map();

    for (const item of collection) {
      const year = item.date.getUTCFullYear();
      const month = item.date.getUTCMonth();

      if (!map.has(year)) map.set(year, new Map());
      const months = map.get(year)!;

      if (!months.has(month)) months.set(month, []);
      months.get(month)!.push(item);
    }

    // ordenar días ascendente
    for (const months of map.values()) {
      for (const items of months.values()) {
        items.sort((a, b) => a.date.getUTCDate() - b.date.getUTCDate());
      }
    }

    return map;
  }, [collection]);

  const years = useMemo(
    () => Array.from(grouped.keys()).sort((a, b) => b - a),
    [grouped]
  );

  return (
    <div className="space-y-12">
      {years.map((year) => {
        const months = grouped.get(year)!;
        const monthIndexes = Array.from(months.keys()).sort((a, b) => b - a);

        return (
          <section key={year}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-2">{year}</h2>
              <div className="flex justify-center"><div className="w-48 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"></div></div>
            </div>

            {monthIndexes.map((month) => (
              <div key={month} className="mb-10">
                <h3 className="mb-6 text-3xl font-medium text-muted">
                  {monthNameEs(month)}
                </h3>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {months.get(month)!.map((item) => (
                    <div key={item.id}>
                      <Card date={item.date} cover={item.cover} href={`/diary/${item.id}`}/>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
};

export default Test;
