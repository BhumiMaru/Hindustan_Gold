import React from "react";
import {
  ShimmerThumbnail,
  ShimmerText,
  ShimmerTitle,
} from "react-shimmer-effects";

export default function ShimmerTableRows({ rows = {}, columns = [] }) {
  const renderCell = (type) => {
    switch (type) {
      case "sr":
        return <ShimmerText line={1} gap={0} />;

      case "avatarText":
        return (
          <div className="d-flex align-items-center gap-2">
            <ShimmerThumbnail height={40} width={40} rounded />
            <div>
              <ShimmerText line={1} />
              <ShimmerText line={1} gap={6} />
            </div>
          </div>
        );

      case "text":
        return <ShimmerText line={1} />;

      case "textLarge":
        return <ShimmerTitle line={1} />;

      case "dotText":
        return (
          <div className="d-flex align-items-center gap-2">
            <ShimmerThumbnail height={12} width={12} rounded />
            <ShimmerText line={1} />
          </div>
        );

      case "status":
        return <ShimmerThumbnail height={20} width={80} rounded />;

      case "action":
        return <ShimmerThumbnail height={18} width={120} />;

      default:
        return <ShimmerText line={1} />;
    }
  };

  return (
    <>
      {[...Array(rows)].map((_, rIndex) => (
        <tr key={rIndex}>
          {columns.map((col, cIndex) => (
            <td key={cIndex}>{renderCell(col)}</td>
          ))}
        </tr>
      ))}
    </>
  );
}
