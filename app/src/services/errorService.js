export const getErrors = async () => {
  try {
    const res = await fetch("http://localhost:3333/odata/v4/api/error/crud?queryType=getAll&LoggedUser=RRG&dbServer=mongodb", 
      {
        method : "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (!res.ok) throw new Error("Error fetching");
    return await res.json();
  } catch (err) {
    console.error("Error fetching errors:", err);
    return [];
  }
};
