export async function load( {fetch} ) {
  const response  = await fetch('api/about');
  const data = await response.json();
  console.log(data, "this is data");
  return data;
}