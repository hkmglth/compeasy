import { getAllStats } from "api/StatsApi";
import { IStatsDto } from "dtos/Stats";
import { useCompanies, useProducts } from "hooks";
import React, { createContext, useEffect, useState } from "react";

export type IStatsContextProps = {
  stats: IStatsDto;
  setStats: (data: IStatsDto) => any;
};

export const StatsContextDefault: IStatsContextProps = {
  stats: {} as IStatsDto,
  setStats: () => {},
};

export const StatsContext =
  createContext<IStatsContextProps>(StatsContextDefault);

const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<IStatsDto>(StatsContextDefault.stats);

  const { companies } = useCompanies();
  const { products } = useProducts();

  const getAllStatss = async () => {
    const response = await getAllStats();
    setStats(response.data);
  };

  useEffect(() => {
    getAllStatss();
  }, [companies, products]);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsProvider;
