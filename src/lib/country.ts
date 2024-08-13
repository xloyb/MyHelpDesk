import prisma from "./client";


// export async function getCountries(skip: number, take: number, search?: string) {
//   const where = search ? {
//     OR: [
//       { name: { contains: search, mode: 'insensitive' } },
//       { shortname: { contains: search, mode: 'insensitive' } }
//     ]
//   } : {};

//   return prisma.country.findMany({
//     where,
//     skip,
//     take,
//   });
// }


export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: 'asc' }, // Optional: order by name or any other attribute
    });
    return countries;
  } catch (error) {
    console.error('Error fetching countries from database:', error);
    throw new Error('Error fetching countries');
  }
};

export async function getCountryById(id: number) {
  return prisma.country.findUnique({
    where: { id },
  });
}

export async function updateCountry(id: number, enabled: boolean) {
  return prisma.country.update({
    where: { id },
    data: { enabled },
  });
}
