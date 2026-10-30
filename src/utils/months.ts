export const MONTHS = [
	"enero",
	"febrero",
	"marzo",
	"abril",
	"mayo",
	"junio",
	"julio",
	"agosto",
	"septiembre",
	"octubre",
	"noviembre",
	"diciembre",
] as const;

export type MonthSlug = (typeof MONTHS)[number];

export const isMonthSlug = (value: string): value is MonthSlug =>
	(MONTHS as readonly string[]).includes(value);

export const monthSlug = (monthIndex: number): MonthSlug =>
	MONTHS[monthIndex] ?? MONTHS[0];

export const monthName = (monthIndex: number): string => {
	const name = new Date(2020, monthIndex, 1).toLocaleString("es-ES", {
		month: "long",
	});

	return name.charAt(0).toUpperCase() + name.slice(1);
};
