import React from 'react'

import { Menubar } from 'primereact/menubar'

import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'

function HeaderBar() {
  const items = [
    {
      label: 'Function List',
      icon: 'pi pi-fw pi-bars',
      items: [
        {
          label: 'My Event',
          command: (event: any) => {
            window.location.pathname = '/my-event'
          },
        },
        {
          label: 'Summary',
          command: (event: any) => {
            window.location.pathname = '/summary-board'
          },
        },
      ],
    },
  ]
  return (
    <div className="headerBar">
      <Menubar model={items} />
    </div>
  )
}

export default HeaderBar
