export default function BreadCrumbs({ list }: { list: string[] }) {
  return (
    <div className="flex items-center text-sm font-suit">
      {list.map((item, index) => (
        <div
          key={`breadcrumb-` + index}
          className={`flex ${
            index === list.length - 1
              ? "font-semibold text-primary"
              : "text-gray-400"
          }`}
        >
          {item}
          {index !== list.length - 1 && <span className="px-2">{`>`}</span>}
        </div>
      ))}
    </div>
  );
}
