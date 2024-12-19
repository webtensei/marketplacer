import React from 'react';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';

const Navigation = () => {
  return (
    <Navbar className='[&>header]:max-w-screen-xl'>
      <NavbarBrand>

        <p className="font-bold text-inherit">MARKETPLACER</p>
      </NavbarBrand>
      <NavbarContent className="hidden min-[750px]:flex gap-4" justify="center">
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
        <NavbarItem className="hidden min-[420px]:flex">
          <Link href="#">Войти</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Зарегистрироваться
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
