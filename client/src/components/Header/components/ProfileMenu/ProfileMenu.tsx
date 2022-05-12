import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { logout } from 'store/user/user.action'
import { selectUserType } from 'store/user/user.selector'

interface ProfileMenuProps {
  profileName: string
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ profileName }) => {
  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  const userType = useAppSelector(selectUserType)

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
        {profileName}
      </MenuButton>
      <MenuList className="min-w-0  w-40 z-50">
        {userType === 'user' && (
          <>
            <Link to={'/profile'}>
              <MenuItem>
                <div className="w-28 ">
                  <i className="fa-solid fa-user mr-3"></i>Профиль
                </div>
              </MenuItem>
            </Link>
            <Link to={'/orders'}>
              <MenuItem>
                <div className="w-28 ">
                  <i className="fa-solid fa-receipt mr-3"></i>Заказы
                </div>
              </MenuItem>
            </Link>
          </>
        )}
        {userType === 'admin' && (
          <Link to="/admin">
            <MenuItem>
              <div className="w-28">
                <i className="fa-solid fa-unlock mr-3"></i>Админ-панель
              </div>
            </MenuItem>
          </Link>
        )}
        <MenuItem onClick={logoutHandler}>
          <div className="w-28">
            <i className="fa-solid fa-right-to-bracket mr-3"></i>Выйти
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
