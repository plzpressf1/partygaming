import { useEffect, useState } from "react";
import { useFetch } from "@pg/hooks/fetch";
import { $wheelApi } from "../../../api";
import { WheelStore } from "../../../stores/wheel-store";
import styles from "./wheel-filter.module.scss";

interface Filters {
    playersFilters: string[],
    categoryFilters: string[];
}

export const WheelFilter = () => {
    const [loading, error, filters] = useFetch<Filters>($wheelApi, {
        url: "/scripts/wheel.php",
        initialValue: { playersFilters: [], categoryFilters: [] },
        payload: { params: { action: "get_filters" } },
    });
    const [players, setPlayers] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        (async () => await fetchWheel({ players, category }))();
    });

    const fetchWheel = async ({ players, category }: { players: string, category: string }) => {
        const resp = await $wheelApi.get("/scripts/wheel.php", {
            params: { action: "get_wheel", players, category },
        });
        WheelStore.setItems(resp.data?.games ?? []);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (filters.playersFilters[0] !== "") filters.playersFilters.unshift("");
    if (filters.categoryFilters[0] !== "") filters.categoryFilters.unshift("");
    return (
        <div className={styles.wrapper}>
            <ul className={styles.list}>
                {filters.playersFilters.map(filter => {
                    const text = filter !== "" ? filter : "Все";
                    const filters = { players, category };
                    return <li
                        key={filter}
                        className={filter === players ? styles.selected : ""}
                        onClick={async () => {
                            setPlayers(filter);
                            await fetchWheel({ ...filters, players: filter });
                        }}
                    >
                        {text}
                    </li>;
                })}
            </ul>
            <ul className={styles.list}>
                {filters.categoryFilters.map(filter => {
                    const text = filter !== "" ? filter : "Все";
                    const filters = { players, category };
                    return <li
                        key={filter}
                        className={filter === category ? styles.selected : ""}
                        onClick={async () => {
                            setCategory(filter);
                            await fetchWheel({ ...filters, category: filter });
                        }}
                    >
                        {text}
                    </li>;
                })}
            </ul>
        </div>
    );
};
