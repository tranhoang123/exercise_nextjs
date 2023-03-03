
import { Container, Text, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useRouter } from 'next/router'

const Detail = () => { 
    const router = useRouter(); 
    const { id } = router.query; 
    const getDetail = async () => {
        const res = await fetch(`/api/marvel/${id}`);
        console.log({ res });
        return res.json();
      };
      const { data, isLoading } = useQuery("marvel", getDetail);
    
    return ( 
        <Container>  
            <Text style={{
              fontWeight: 'bold', 
              color: 'red', 
              paddingTop: 12.0,
              paddingBottom: 12.0,
            }}>{data.type ?? ''}</Text>
            <Text style={{
              fontWeight: 'bold', 
              color: 'red', 
              paddingTop: 12.0,
              paddingBottom: 12.0,
            }}>{data.title ?? ''}</Text>
            <Text style={{
              color: 'black', 
              fontWeight: '700',
            }}>Overview: </Text>
            <Text>{data.overview ?? "Don't have overview"}</Text>
            <Container style={{ 
              borderBottomWidth: 1, 
              borderBottomColor: 'black',
              height: 25,
            }}/>
          </Container>
    ); 
}

export default Detail;