import './App.scss';
import React, {useState} from "react";
import {
  EuiPage, EuiPageBody, EuiPageSection, EuiPageSidebar, EuiSideNav, EuiIcon, slugify, EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiAvatar,
} from "@elastic/eui";

function App() {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState('Time stuff');

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const createItem = (name: string, data = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };


  const sideNav = [
    createItem('Elasticsearch', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticsearch"/>,
      items: [
        createItem('Data sources'),
        createItem('Users'),
        createItem('Roles'),
        createItem('Watches'),
        createItem(
          'Extremely long title will become truncated when the browser is narrow enough'
        ),
      ],
    }),
    createItem('Kibana', {
      onClick: undefined,
      icon: <EuiIcon type="logoKibana"/>,
      items: [
        createItem('Advanced settings', {
          items: [
            createItem('General', {disabled: true}),
            createItem('Timelion', {
              items: [
                createItem('Time stuff', {
                  icon: <EuiIcon type="clock"/>,
                }),
                createItem('Lion stuff', {
                  icon: <EuiIcon type="stats"/>,
                }),
              ],
            }),
            createItem('Visualizations'),
          ],
        }),
        createItem('Index Patterns'),
        createItem('Saved Objects'),
        createItem('Reporting'),
      ],
    }),
    createItem('Logstash', {
      onClick: undefined,
      icon: <EuiIcon type="logoLogstash"/>,
      items: [createItem('Pipeline viewer')],
    }),
  ];

  return (
    <div className="App">
      <EuiHeader>
        <EuiHeaderSectionItem>
          <EuiHeaderLogo>Creators</EuiHeaderLogo>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>

          <EuiHeaderSectionItemButton disabled aria-label="Sitewide search">
            <EuiIcon type="search" size="m" />
          </EuiHeaderSectionItemButton>

          <EuiHeaderSectionItemButton disabled aria-label="Account menu">
            <EuiAvatar isDisabled name="John Username" size="s" />
          </EuiHeaderSectionItemButton>

          <EuiHeaderSectionItemButton
            disabled
            aria-label="Apps menu with 1 new app"
            notification="1"
          >
            <EuiIcon type="apps" size="m" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeader>
      <EuiPage
        paddingSize="none"
        restrictWidth
        grow
      >
        <EuiPageSidebar paddingSize="l">
          <EuiSideNav
            aria-label="Complex example"
            mobileTitle=""
            toggleOpenOnMobile={toggleOpenOnMobile}
            isOpenOnMobile={isSideNavOpenOnMobile}
            items={sideNav}
            style={{width: 192}}
          />
        </EuiPageSidebar>
        <EuiPageBody paddingSize="none" panelled={true}>
          <EuiPageSection>
            hello
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}

export default App;
