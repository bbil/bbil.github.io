import React from 'react';
import { Link } from 'gatsby'

import { rhythm, scale } from "../utils/typography"

interface HeaderProps {
    title: string;
}

const RootHeader: React.FunctionComponent<HeaderProps> = ({ title }) => (
    <h1
        style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
        marginTop: 0,
        }}
    >
        <Link
        style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
        }}
        to={`/`}
        >
        {title}
        </Link>
    </h1>
);

const OtherHeader: React.FunctionComponent<HeaderProps> = ({ title }) => (
    <h3
        style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
        }}
    >
        <Link
        style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
        }}
        to={`/`}
        >
        {title}
        </Link>
    </h3>
)

const Footer: React.FunctionComponent = () => (
    <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
);

interface Props {
    location: Location
    title: string
}

const Layout: React.FunctionComponent<Props> = ({ location, title, children }) => {
    // @ts-ignore -- what?
    const rootPath = `${__PATH_PREFIX__}/`
    let header: React.ReactNode;

    if (location.pathname === rootPath) {
        header = <RootHeader title={title} />
    } else {
        header = <OtherHeader title={title} />
    }

    return (
        <div
        style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
        >
        <header>{header}</header>
        <main>{children}</main>
        <Footer />
        </div>
    )
};

export default Layout;
