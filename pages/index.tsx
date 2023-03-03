import {
  Container,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type Item = {
  title?: string;
  overview?: string;
  type: TypeList;
  id: number;
};

type TypeList = "tvShow" | "movie" | "show";

const Home = () => {
  const router = useRouter();
  const [type, setType] = useState<TypeList>("show");
  const getMarvel = async () => {
    let path;
    
    if(type == 'show')  { 
      path = '/api/marvel'; 
    } else { 
      path = `/api/marvel?type=${type}`; 
    }

    const res = await fetch(path);
    console.log({ res });
    return res.json();
  };

  const { data, isLoading, refetch } = useQuery("marvel", getMarvel);

  useEffect(() => { 
     refetch(); 
  }, [type]); 

  console.log({ data }, "data return");
  
  return (
    <Container>
      <Container style={{ flexDirection: "column" }}>
        <Container style={{ flexDirection: "row" }}>
          <Text>All</Text>
          <Checkbox
            isChecked={type == "show"}
            onChange={(event) => event.target.checked && setType("show")}
          />
        </Container>
        <Container style={{ flexDirection: "row" }}>
          <Text>TV show</Text>
          <Checkbox
            isChecked={type == "tvShow"}
            onChange={(event) => event.target.checked && setType("tvShow")}
            title={"Tv Show"}
          />
        </Container>
        <Container style={{ flexDirection: "row" }}>
          <Text>Movie</Text>
          <Checkbox
            isChecked={type == "movie"}
            onChange={(event) => event.target.checked && setType("movie")}
            title={"Tv Show"}
          />
        </Container>
      </Container>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        (Array.isArray(data) ? data : [])
          .filter((item: Item) => {
            if (type == "show") {
              return true;
            } else {
              return item.type == type;
            }
          })
          .map((item: Item, index: number) => {
            return (
              <Container
                key={`list${index}`}
                onClickCapture={() => {
                  router.push(`/detail/${item.id}`);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "red",
                    paddingTop: 12.0,
                    paddingBottom: 12.0,
                  }}
                >
                  {item.type ?? ""}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "red",
                    paddingTop: 12.0,
                    paddingBottom: 12.0,
                  }}
                >
                  {item.title ?? ""}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "700",
                  }}
                >
                  Overview:{" "}
                </Text>
                <Text textAlign={'justify'}>{item.overview ?? "Don't have overview"}</Text>
                <Container
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    height: 25,
                  }}
                />
              </Container>
            );
          })
      )}
    </Container>
  );
};

export type { Item, TypeList };

export default Home;
