import React, { useEffect, useState } from "react";
import { Center, Container, Grid, Spinner, useToast } from "@chakra-ui/react";
import StatItem from "../fragments/StatItem";
import WorkBag from "../../../assets/vectors/landing-stat-bag.svg";
import Hat from "../../../assets/vectors/landing-stat-hat.svg";
import Building from "../../../assets/vectors/landing-stat-building.svg";
import Chart from "../../../assets/vectors/landing-stat-chart.svg";
import { formatAmmount } from "../../../utils/helpers/formatAmmount";

import axios from "axios";
import { API_URL, HEADER_CONFIG } from "../../../utils/constants";

export default function StatSection() {
  const [meta, setMeta] = useState({
    industrialVisit: 0,
    jobFair: 0,
    internship: 0,
    certification: 0,
  });

  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchStat = () => {
    axios
      .get(`${API_URL}/utility/landing-page`, HEADER_CONFIG)
      .then((res) => setMeta(res.data.data.metaModel))
      .catch((err) => {
        err = err.response.data;
        return toast({
          title: `Error ${err.code ?? 500}`,
          description:
            err.message ??
            "Mohon maaf saat ini sedang ada masalah. Silahkan hubungi Customer Service atau tim Dev!",
          status:
            err.code?.toString().match(/^\d/)[0] == 4 ? "warning" : "error",
          position: "bottom-right",
          variant: "left-accent",
          isClosable: true,
        });
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchStat();
  }, []);

  if (loading) {
    return (
      <Center>
        <Spinner colorScheme="red" />
      </Center>
    );
  } else {
    return (
      <Container
        maxW="60%"
        gridTemplateRows="repeat(4, 1fr)"
        gap={6}
        py={14}
        id="news-section"
      >
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
          alignItems="start"
        >
          <StatItem
            icon={Chart}
            color="#61B3FF"
            value={meta.industrialVisit}
            name="Kunjungan Industri"
          />
          <StatItem
            icon={WorkBag}
            color="#455A64"
            value={meta.jobFair}
            name="Bursa Kerja"
          />
          <StatItem
            icon={Building}
            color="#7B61FF"
            value={meta.internship}
            name="Magang Guru/Siswa"
          />
          <StatItem
            icon={Hat}
            color="#FE9B43"
            value={meta.certification}
            name="Sertifikasi Online"
          />
        </Grid>
      </Container>
    );
  }
}
