import {EuiIcon, EuiPageSidebar, EuiSideNav, slugify} from "@elastic/eui";
import React, {useState} from "react";

const SideNav = () => {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState("");

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
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

  const sideNav = [
    createItem('인플루언서 찾기', {
      key: 'a',
      onClick: undefined,
      icon: <EuiIcon type="logoElasticsearch"/>,
    }),
    createItem('분야별 인플루언서', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticStack"/>,
      items: [
        createItem('전체', { key: 'b', }),
        createItem('음식'),
        createItem('건강/의학'),
        createItem('도서'),
        createItem('교육'),
        createItem('음악'),
        createItem('영화/드라마'),
        createItem('운동'),
        createItem('패션'),
        createItem('뷰티'),
      ],
    }),
    createItem('설정', {
      onClick: undefined,
      icon: <EuiIcon type="logoCloudEnterprise"/>,
      items: [
        createItem('계정 설정'),
        createItem('연락처'),
        createItem('이용권'),
      ],
    }),
  ];

  return (
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
  )
}

export default SideNav