export const getLocationAddress = async (lon: number, lat: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "User-Agent": "Skatrium-Dashboard" } },
    );
    const data = await res.json();
    return data?.display_name;
  } catch (err) {
    console.error("Reverse geocode failed:", err);
  }
};
