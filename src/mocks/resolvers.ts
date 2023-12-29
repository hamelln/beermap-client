import { ResponseResolver, RestContext, RestRequest } from "msw";

const breweryList = [
  {
    address: "아차산로 49길 22",
    beerDescription:
      "오렌지제스트의 시트러스, 얇은 바디감과 드리이한 피니시로 편하게 마실 수 있는 팜하우스에일",
    beerName: "그리젯",
    breweryDescription:
      "매장 내 양조장에서 직접 생산하는 13종의 수제맥주와 피자, 버거 등 맛있는 안주를 판매하고 있습니다.\n커피와 싱글몰트 위스키, 와인도 저렴하게 즐기실 수 있도록 준비되어있습니다.\n구의동 먹자골목의 입구부근 (구의역1번출구, 도보2분) 에 위치하고 있습니다.",
    breweryIntro:
      "영국에서 배운 전통 양조 시스템을 토대로 만든 각종 맥주, 세종, 그리고 국내 유일의 캐스크 에일을 맛볼 수 있는 곳",
    breweryName: "아쉬트리",
    breweryType: "brewpub",
    city: "광진구",
    id: "09c1e42a-8e73-4097-af34-f1ff0cd6034e",
    images: [
      {
        id: "rsdxjyyvmkbkpww8wqnp",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/rsdxjyyvmkbkpww8wqnp.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/rsdxjyyvmkbkpww8wqnp.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/rsdxjyyvmkbkpww8wqnp.jpg",
      },
      {
        id: "t3pqgzgbh5q7krinoywe",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/t3pqgzgbh5q7krinoywe.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/t3pqgzgbh5q7krinoywe.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/t3pqgzgbh5q7krinoywe.jpg",
      },
      {
        id: "jfcqsd3qi5olnqwibjej",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/jfcqsd3qi5olnqwibjej.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/jfcqsd3qi5olnqwibjej.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/jfcqsd3qi5olnqwibjej.jpg",
      },
    ],
    initialCarouselImage: "/carousel_titles/ash_tree.webp",
    latitude: 37.49360307,
    logo: "/logos/ash_tree.webp",
    longitude: 127.0323206,
    officeHours: {
      금: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "11:30",
      },
      목: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "11:30",
      },
      수: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "11:30",
      },
      월: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "11:30",
      },
      일: {
        closeTime: "closed",
        openTime: "closed",
      },
      토: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "15:00",
      },
      화: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "11:30",
      },
    },
    phone: "02-6339-4858",
    postalCode: "05043",
    stateProvince: "서울",
    summarizedOfficeHours: [
      ["월 - 금", "11:30 - 23:00", "none"],
      ["토", "15:00 - 23:00", "none"],
      ["일", "closed", "none"],
    ],
    websiteType: "홈페이지",
    websiteUrl: "https://www.ashtreebrewery.com/",
  },
  {
    address: "연무장길 28-12",
    beerDescription:
      "CRISP / CLEAN / HERBAL ABV 4.8% IBU 25 정통 독일식 필스에대한 존중을 담아 독일산 맥아와 홉만을 사용한 크라프트베르크 필스는 스텝 매싱과 장기간의 라거링을 거쳐 탄생했습니다.",
    beerName: "크라프트베르크 필스",
    breweryDescription:
      "서울에는 많은 즐거움이 있습니다.\n\n아름다운 자연과 독특한 가게들,\n맛있는 음식, 손에 닿는 편리함.\n저희는 그 즐거움에 한 가지를 보태려고 합니다.\n\n서울 사람들이,\n서울 감성으로,\n서울에서 양조한 맥주.\n\n서울브루어리입니다.",
    breweryIntro: "맥주만 마셔도 펼쳐지는 미식의 세계",
    breweryName: "서울 브루어리 성수",
    breweryType: "brewpub",
    city: "성동구",
    id: "112b67f2-e2ec-4d54-9efb-a5dc5a38933a",
    images: [
      {
        id: "ocjdhln8sjaob7w8ouno",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/ocjdhln8sjaob7w8ouno.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/ocjdhln8sjaob7w8ouno.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/ocjdhln8sjaob7w8ouno.jpg",
      },
      {
        id: "kimiizfp4ghaj9mespxy",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/kimiizfp4ghaj9mespxy.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/kimiizfp4ghaj9mespxy.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/kimiizfp4ghaj9mespxy.jpg",
      },
      {
        id: "pmi9cwftgl2i6m2gtz6h",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/pmi9cwftgl2i6m2gtz6h.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/pmi9cwftgl2i6m2gtz6h.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/pmi9cwftgl2i6m2gtz6h.jpg",
      },
    ],
    initialCarouselImage: "/carousel_titles/seoul_brewery_seongsu.webp",
    latitude: 37.5430127,
    logo: "/logos/seoul_brewery.webp",
    longitude: 127.052392,
    officeHours: {
      금: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
      목: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
      수: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
      월: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
      일: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
      토: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
      화: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "11:00",
      },
    },
    phone: "02-3409-7910",
    postalCode: "04083",
    stateProvince: "서울",
    summarizedOfficeHours: [["매일", "11:00 - 24:00", "none"]],
    websiteType: "홈페이지",
    websiteUrl: "https://seoulbrewery.imweb.me/",
  },
  {
    address: "토정로 3안길 10",
    beerDescription:
      "Tangerine / Pineapple / Dank 시트라, 모자익,이콰넛, 코멧 홉을 대량 투입하여 감귤과 파인애플의 맛과 향이 매력적인 IPA",
    beerName: "페일 블루 닷 IPA",
    breweryDescription:
      "서울에는 많은 즐거움이 있습니다.\n\n아름다운 자연과 독특한 가게들,\n맛있는 음식, 손에 닿는 편리함.\n저희는 그 즐거움에 한 가지를 보태려고 합니다.\n\n서울 사람들이,\n서울 감성으로,\n서울에서 양조한 맥주.\n\n서울브루어리입니다.",
    breweryIntro: "독특하지만 기본기가 충실한 맥주와 캠핑장 감성",
    breweryName: "서울 브루어리 합정",
    breweryType: "brewpub",
    city: "마포구",
    id: "115b67f2-e2ec-4d54-9efb-a5dc5a38933a",
    images: [
      {
        id: "rcsccnpnjhahrwdeke1j",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/rcsccnpnjhahrwdeke1j.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/rcsccnpnjhahrwdeke1j.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/rcsccnpnjhahrwdeke1j.jpg",
      },
      {
        id: "j4jcn7ugn6saewndd9ug",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/j4jcn7ugn6saewndd9ug.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/j4jcn7ugn6saewndd9ug.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/j4jcn7ugn6saewndd9ug.jpg",
      },
      {
        id: "vitvlt2jzlcsbnslqt3g",
        large:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_1600,h_1600/f_auto/q_auto/vitvlt2jzlcsbnslqt3g.jpg",
        medium:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_856,h_856/f_auto/q_auto/vitvlt2jzlcsbnslqt3g.jpg",
        small:
          "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_560,h_560/f_auto/q_auto/vitvlt2jzlcsbnslqt3g.jpg",
      },
    ],
    initialCarouselImage: "/carousel_titles/seoul_brewery_hapjeong.webp",
    latitude: 37.5458841,
    logo: "/logos/seoul_brewery.webp",
    longitude: 126.914613,
    officeHours: {
      금: {
        closeTime: "24:00",
        openTime: "17:00",
      },
      목: {
        closeTime: "24:00",
        openTime: "17:00",
      },
      수: {
        closeTime: "24:00",
        openTime: "17:00",
      },
      월: {
        closeTime: "24:00",
        openTime: "17:00",
      },
      일: {
        closeTime: "24:00",
        openTime: "13:00",
      },
      토: {
        closeTime: "24:00",
        openTime: "13:00",
      },
      화: {
        closeTime: "24:00",
        openTime: "17:00",
      },
    },
    phone: "070-7756-0915",
    postalCode: "04083",
    stateProvince: "서울",
    summarizedOfficeHours: [
      ["월 - 금", "17:00 - 24:00", "none"],
      ["토, 일", "13:00 - 24:00", "none"],
    ],
    websiteType: "홈페이지",
    websiteUrl: "https://seoulbrewery.imweb.me/",
  },
  {
    address: "관광로 418",
    beerDescription:
      "홍차, 유당, 레몬의 풍미가 조화롭게 어우러지는 쥬시한 헤이지 페일에일",
    beerName: "블티나 HPA",
    breweryDescription:
      "속초 최초의 Brew Pub! 서울 익선동의 Craft Roo의 수제맥주 양조장! 다양한 수제맥주를 즐길 수 있는 곳!",
    breweryIntro: "속초 최초의 Brew Pub!",
    breweryName: "CRAFTROOT",
    breweryType: "brewpub",
    city: "속초시",
    id: "200b3434-8f97-4a9d-a072-fcb7379b31d5",
    latitude: 38.19724237,
    longitude: 128.5377122,
    initialCarouselImage: "/carousel_titles/craft_root.webp",
    logo: "/logos/craft_root.webp",
    officeHours: {
      금: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "16:00",
      },
      목: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "16:00",
      },
      수: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "16:00",
      },
      월: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "16:00",
      },
      일: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "12:00",
      },
      토: {
        closeTime: "24:00",
        lastOrder: "23:30",
        openTime: "12:00",
      },
      화: {
        closeTime: "23:00",
        lastOrder: "22:30",
        openTime: "16:00",
      },
    },
    phone: "070-8872-1001",
    postalCode: "24859",
    stateProvince: "강원도",
    websiteType: "홈페이지",
    websiteUrl: "https://craftroot.co.kr/",
  },
];

export const mockBrewery: ResponseResolver<RestRequest, RestContext> = (
  req,
  res,
  ctx
) => {
  const query = req.url.searchParams.get("q") ?? "";
  const result =
    query === ""
      ? breweryList
      : breweryList.filter(({ breweryName, city, stateProvince }) => {
          return (
            breweryName.includes(query) ||
            city.includes(query) ||
            stateProvince.includes(query) ||
            query.toLowerCase() === breweryName.toLowerCase()
          );
        });

  return res(ctx.json(result));
};
