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
// 72200. Entertainment = 엔터테인먼트
// 33508. Travel & Events = 여행/이벤트
// 21019. Gaming = 게임
// 19745. Comedy = 코메디
// 27271. Music = 음악
// 4750. Pets & Animals = 애완동물/동물
// 12900. Film & Animation = 영화/애니메이션
// 74936. People & Blogs = 인물/블로그
// 44948. News & Politics = 뉴스/정치
// 22300. Autos & Vehicles = 자동차/교통
// 11046. Sports = 스포츠
// 9561. Howto & Style = 노하우/스타일
// 6752. Science & Technology 6752 = 과학기술
// 6600. Education  = 교육
// Nonprofits & Activism = 비영리 활동
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
        createItem('PPL/BDC 모아보기', { key: 'b', }),
        createItem('엔터테인먼트', {
          onClick: () => { navigate("/categories/엔터테인먼트") },
        }),
        createItem('여행/이벤트', {
          onClick: () => { navigate("/categories/여행&이벤트") },
        }),
        createItem('게임', {
          onClick: () => { navigate("/categories/게임") },
        }),
        createItem('코메디', {
          onClick: () => { navigate("/categories/코메디") },
        }),
        createItem('음악', {
          onClick: () => { navigate("/categories/음악") },
        }),
        createItem('애완동물/동물', {
          onClick: () => { navigate("/categories/애완동물&동물") },
        }),
        createItem('영화/애니메이션', {
          onClick: () => { navigate("/categories/영화&애니메이션") },
        }),
        createItem('인물/블로그', {
          onClick: () => { navigate("/categories/인물&블로그") },
        }),
        createItem('뉴스/정치', {
          onClick: () => { navigate("/categories/뉴스&정치") },
        }),
        createItem('자동차/교통', {
          onClick: () => { navigate("/categories/자동차&교통") },
        }),
        createItem('스포츠', {
          onClick: () => { navigate("/categories/스포츠") },
        }),
        createItem('노하우/스타일', {
          onClick: () => { navigate("/categories/노하우&스타일") },
        }),
        createItem('과학기술', {
          onClick: () => { navigate("/categories/과학기술") },
        }),
        createItem('교육', {
          onClick: () => { navigate("/categories/교육") },
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

export default SideNav;
