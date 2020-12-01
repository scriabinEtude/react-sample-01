import React from 'react'
import {Menu} from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mall">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="favorite">
                <a href="/favorite">Favorite</a>
            </Menu.Item>
            <Menu.Item key="subscription">
                <a href="/subscription">Subscription</a>
            </Menu.Item>
        </Menu>
    )
}

export default LeftMenu
