import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

const sortOptions = [
  { label: "Most recent", value: "most-recent" },
  { label: "Oldest", value: "oldest" },
];

function SortDropdown() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedSorts, setSelectedSorts] = useState([]);

  useEffect(() => {
    const sortsFromURL = searchParams.get("sortby")?.split(",") || [];
    setSelectedSorts(sortsFromURL.filter(Boolean));
  }, [searchParams]);

  const handleSortChange = (value) => {
    let updated = selectedSorts.includes(value)
      ? selectedSorts.filter((s) => s !== value)
      : [...selectedSorts, value];

    const newParams = new URLSearchParams(searchParams.toString());
    if (updated.length) {
      newParams.set("sortby", updated.join(","));
    } else {
      newParams.delete("sortby");
    }

    navigate(`/favorites?${newParams.toString()}`, { replace: true });
    setSelectedSorts(updated);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="max-[500px]:hidden">Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {sortOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedSorts.includes(option.value)}
            onCheckedChange={() => handleSortChange(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortDropdown;
