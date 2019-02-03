import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    mode: 'vertical',
    theme: 'dark',
  }

  render() {
    return (
      <div>
        <Menu
          style={{ width: 256 }}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          <SubMenu key="graj" title={<span><Icon type="play-circle" /><span>Graj</span></span>}>
            <Menu.Item key="Live">Szachy live</Menu.Item>
            <Menu.Item key="Online">Szachy online</Menu.Item>
            <Menu.Item key="Komputer">Komputer</Menu.Item>
            <SubMenu key="uczsie" title="Ucz się">
              <Menu.Item key="Lekcje">Lekcje</Menu.Item>
              <Menu.Item key="Otwarcia">Otwarcia</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default Sider;