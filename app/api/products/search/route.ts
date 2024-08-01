import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------

/**
 * GET function for searching products by name.
 *
 * @param req - The Next.js request object.
 * @returns A Promise that resolves to an array of products that match the search query.
 */
export async function GET(req: NextRequest) {
  // Get the search query from the request URL parameters.
  // If no query is provided, default to an empty string.
  const query = req.nextUrl.searchParams.get("query") || "";

  // Use Prisma to search for products whose name contains the search query.
  // The search is case-insensitive.
  // Limit the number of results to 5.
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  return NextResponse.json(products);
}
