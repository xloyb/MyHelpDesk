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


export async function getCountries(skip: number, take: number, search: string) {
  try {
    const countries = await prisma.country.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            name: {
              contains: search.toLowerCase(),
            },
          },
          {
            shortname: {
              contains: search.toLowerCase(),
            },
          },
        ],
        AND: [
          {
            name: {
              contains: search.toLowerCase(),
            },
          },
          {
            shortname: {
              contains: search.toLowerCase(),
            },
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    });
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Error fetching countries');
  }
}

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
