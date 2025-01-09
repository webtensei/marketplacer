import React from 'react';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';

const Navigation = () => {
  // [&>header]:max-w-screen-2xl
  return (
    <Navbar className=''>
      <NavbarBrand>

        <p className="font-bold text-inherit">MARKETPLACER</p>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Преимущества
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Как работает?
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Стоимость
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button radius='sm' as={Link} color="primary" href="#">
            Присоединиться
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
