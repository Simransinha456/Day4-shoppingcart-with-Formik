import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../Database/supabaseClient';
import { Navbar } from '../Navbar/Loadable';

interface Item {
  name: string;
  image: string;
}

interface HomeProps {
  getShopping: () => void;
  shopping: Item[];
}

export const HomePage: React.FC<HomeProps> = ({ getShopping, shopping }) => {
  const [items, setItems] = useState<Item[]>(shopping);

  useEffect(() => {
    getShopping();
    setItems(shopping);
  }, [getShopping, shopping]);

  // Handle item deletion or creation
  const handleDelete = async (itemName: string, isDelete: boolean = true) => {
    if (isDelete) {
      const { data, error } = await supabase
        .from('shoppingcart')
        .delete()
        .eq('name', itemName);

      if (error) {
        console.error('Error deleting:', error);
      } else {
        console.log('Deleted:', data);
        setItems(items.filter(item => item.name !== itemName));
      }
    } else {
      // Handle item creation
      const newItem = { name: itemName, image: 'imageUrl' };
      setItems([newItem, ...items]); // Add the new item to the beginning of the items array
    }
  };

  return (
    <>
      <Navbar />
      <GridContainer>
        {items.map((item, index) => (
          <ItemWrapper key={index}>
            <h2>{item.name}</h2>
            <ItemImage src={item.image} alt="item" />
            <div className="buttons">
              <Button>Add to cart</Button>
              <Button onClick={() => handleDelete(item.name)}>Delete</Button>
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
