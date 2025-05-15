import { fetchData, mapHandles } from "../models/dataHandler";


const summarizeReservations = (assignmentMap: any, chargesMap: any) => {
  return (
    Object.entries(assignmentMap) as [string, any[]][]
  ).map(([reservation_uuid, assignments]) => {
    let activeCount = 0;
    let activeSum   = 0;

    for (const { id } of assignments) {
      const charge = chargesMap[id];
      if (charge && charge.active) {
        activeCount++;
        activeSum   += charge.amount;
      }
    }

    return { reservation_uuid, activeCount, activeSum };
  });
};



export const getAllProductsAssignmentData = async (): Promise<any[]> => {
  let productsAssignments: any[] = [];
  let productsCharges: any[] = [];
  let result = {}


  try {
    productsAssignments = await fetchData(mapHandles.productsAssignments.allProductsAssignments);
    productsCharges = await fetchData(mapHandles.productsCharges.allProductsCharges);

    // console.log('assignmentMap', assignmentMap)
    console.log('result1111', result)
  } catch (error) {
    throw new Error("Failed to load products data");
  }

  return productsAssignments;
};