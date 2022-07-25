export default function LinkerCard() {
  return (
    <div className="inline-block w-[20rem] h-[20rem] bg-white bg-opacity-30 shadow-md hover:shadow-xl rounded-lg">
      <div className="bg-yellow-500 h-3/5 rounded-t-lg">Prewiew picture</div>
      <div className="p-4 h-2/5">
        <h2 className="font-bold text-2xl text-slate-600">List name</h2>
        <p className="line-clamp-2 mt-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          debitis nulla eligendi recusandae? Placeat maxime inventore, fugit
          voluptatibus aperiam sit perferendis voluptas, aut doloribus modi
          consectetur temporibus ut aliquid nobis?
        </p>
      </div>
    </div>
  );
}
