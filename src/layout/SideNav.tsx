import {EuiIcon, EuiPageSidebar, EuiSideNav, slugify} from "@elastic/eui";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState("");

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };
  const createItem = (name: string, data = {}) => {
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
      onClick: () => selectItem(name),
      ...data,
    };
  };

  const sideNav = [
    createItem('BDC/PPL/채널', {
      onClick: undefined,
      icon: <EuiIcon type="logoElasticStack"/>,
      items: [
        createItem('PPL/BDC 모아보기', { key: 'b', }),
        createItem('웹예능', {
          onClick: () => { navigate("/categories/웹예능") },
        }),
        createItem('음식', {
          onClick: () => { navigate("/categories/음식") },
        }),
        createItem('건강/의학', {
          onClick: () => { navigate("/categories/건강의학") },
        }),
        createItem('도서', {
          onClick: () => { navigate("/categories/도서") },
        }),
        createItem('교육', {
          onClick: () => { navigate("/categories/교육") },
        }),
        createItem('음악', {
          onClick: () => { navigate("/categories/음악") },
        }),
        createItem('영화/드라마', {
          onClick: () => { navigate("/categories/영화드라마") },
        }),
        createItem('운동', {
          onClick: () => { navigate("/categories/운동") },
        }),
        createItem('패션', {
          onClick: () => { navigate("/categories/패션") },
        }),
        createItem('뷰티', {
          onClick: () => { navigate("/categories/뷰티") },
        }),
      ],
    }),
    createItem('대시보드', {
      key: 'a',
      onClick: () => { navigate("/dashboard") },
      icon: <EuiIcon type="logoElasticsearch"/>,
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