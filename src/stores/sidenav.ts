import { NavGroup } from "@/components/SideNav";
import i18n from "@/i18n";
import { games } from "@/utils/constants";
import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";


interface SideNavStoreStage {
    groups: NavGroup[];
    setGroups: (groups: NavGroup[]) => void;
}

export const useSideNavStore = create<SideNavStoreStage>((set) => ({
    groups: [],
    setGroups: (groups) => set({
        groups,
    })
}))