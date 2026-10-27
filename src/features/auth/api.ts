export async function getRoot() {
  const response = await fetch('http://localhost:8000/')
  if(!response.ok){
    throw new Error("getRoot is not ok")    
  }
  return response.json();
}

export async function registerUser(body: any) {
  try {
    await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(res => res.json())
    .then(json => console.log(json))
  } catch (error) {
    console.log("ERROR: "+error)
  }
}