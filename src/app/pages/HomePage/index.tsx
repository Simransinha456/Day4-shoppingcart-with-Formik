import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../Database/supabaseClient';
import { Navbar } from '../Navbar/Loadable';

interface Item {
  name: string;
  image: string;
  unique_id: string;
}

interface HomeProps {
  getShopping: () => void;
  shopping: Item[];
}

export const HomePage: React.FC<HomeProps> = ({ getShopping, shopping }) => {
  const [items, setItems] = useState<Item[]>(shopping);

  useEffect(() => {
    setItems(shopping || []);
  }, [shopping]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await supabase.auth.getSession();
        // console.log(authToken?.data?.session?.access_token , "kgvhy")
        const token = authToken?.data?.session?.access_token;
        const response = await fetch(
          'https://fflcmvlwyzivjsgqxlzw.supabase.co/functions/v1/hello-world',
          {
            headers: {
              accept: '*/*',
              'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
              apikey:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbGNtdmx3eXppdmpzZ3F4bHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzODQzMzQsImV4cCI6MjAyOTk2MDMzNH0.HVHh7QM0w57rLTzDayn1ktEss_wrSi1ruOuhBxxSdQM',

              authorization: `Bearer ${token}`,
              // "priority": "u=1, i",
              'sec-ch-ua':
                '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"macOS"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'cross-site',
              'x-client-info': 'supabase-js-web/2.43.0',
            },
            referrer: 'http://localhost:3000/',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: null,
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
          },
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (unique_id: string) => {
    try {
      // Call the getUser method to get user information
      const { error: userError } = await supabase.auth.getUser();

      if (userError) {
        throw new Error('Error getting user information');
      }

      const { data: shoppingcartData, error: deleteError } = await supabase
        .from('shoppingcart')
        .delete()
        .eq('unique_id', unique_id);

      if (deleteError) {
        console.error('Error deleting item:', deleteError);
      } else {
        console.log('Deleted item:', unique_id);
        setItems(items.filter(item => item.unique_id !== unique_id));
      }
    } catch (error: any) {
      console.error('Error deleting item:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <GridContainer>
        {items?.map((item, index) => (
          <ItemWrapper key={index}>
            <h2>{item.name}</h2>
            <ItemImage src={item.image} alt="item" />
            <div className="buttons">
              <Button>Add to cart</Button>
              <Button onClick={() => handleDelete(item.unique_id)}>
                Delete
              </Button>
            </div>
          </ItemWrapper>
        ))}
      </GridContainer>
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  height: 100%;
  background-color: white;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 0.6em;
  background-color: #f0f0f0;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 10px 6px 0 0;
  border: none;
  border-radius: 5px;
  background-color: #054ead;
  color: white;
  cursor: pointer;
  font-size: 0.7rem;

  &:hover {
    background-color: #1a202c;
  }
`;

export default HomePage;
