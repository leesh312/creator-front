import {
  EuiAvatar,
  EuiFieldSearch,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton, EuiIcon
} from "@elastic/eui";
import React, {useEffect, useState} from "react";
import {useSearch} from "../api/apis";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const { data: searchResult } = useSearch(searchQuery)

  const onChangeSearchbar = (e: string) => {
    setSearchQuery(e)
  }

  useEffect(() => {
    if (searchResult && searchResult.items.length === 1) {
      const item = searchResult.items[0]
      navigate(`/channels/${item.channelId}`)
    }
  }, [searchResult])

  console.log("channelData", searchResult)

  return (
    <EuiHeader>
      <EuiHeaderSection
        grow
      >
        <EuiHeaderSectionItem>
          <EuiHeaderLogo>Creators Club</EuiHeaderLogo>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem
        >
          <EuiFieldSearch
            placeholder="인플루언서/분야 검색"
            isClearable
            aria-label="Use aria labels when no actual label is in use"
            fullWidth
            onSearch={onChangeSearchbar}
          />
        </EuiHeaderSectionItem>

      </EuiHeaderSection>
      <EuiHeaderSectionItem>

        <EuiHeaderSectionItemButton disabled aria-label="Sitewide search">
          <EuiIcon type="search" size="m"/>
        </EuiHeaderSectionItemButton>

        <EuiHeaderSectionItemButton disabled aria-label="Account menu">
          <EuiAvatar isDisabled name="John Username" size="s"/>
        </EuiHeaderSectionItemButton>

        <EuiHeaderSectionItemButton
          disabled
          aria-label="Apps menu with 1 new app"
          notification="1"
        >
          <EuiIcon type="apps" size="m"/>
        </EuiHeaderSectionItemButton>
      </EuiHeaderSectionItem>
    </EuiHeader>
  )
}

export default Header