import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../Assets/images/logoblack.png";
import logoNoText from "../Assets/images/logo.png";
import { Link } from "react-router-dom";
import chrome from "../Assets/images/chrome-white-icon.svg";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Success Stories", href: "#success-stories" },
    { label: "Resources", href: "#resources" },
    { label: "About Us", href: "#about-us" },
    { label: "Affiliated program", href: "#affiliated-program" },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: "transparent",
    padding: "8px 0px",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: "space-between",
    minHeight: 64,
}));

const LogoBox = styled(Box)(({ theme }) => ({
    width: 66,
    height: "auto",
    [theme.breakpoints.up("sm")]: {
        display: "inline-block",
    },
    "& img": {
        width: "100%",
        height: "100%",
    }
}));

const LogoImgDrawer = styled("img")(({ theme }) => ({
    height: 32,
}));

const CenterLinks = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: "none",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
    gap: "30px"
}));

const NavButton = styled("a")(({ theme }) => ({
    color: "#000000",
    fontWeight: 400,
    fontSize: 16,
    textTransform: "capitalize",
    textDecoration: "none",
}));

const RightButtonBox = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(180deg, #16D3F0 0%, #00AEEF 100%)",
    color: "#F8F8F8",
    borderRadius: 40,
    padding: "8px 19px",
    fontWeight: 600,
    fontSize: 14,
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    "& img": {
        width: 20,
        height: 20,
    }
}));

const BurgerMenuBox = styled(Box)(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.up("md")]: {
        display: "none",
    },
}));

const DrawerWithStyles = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        width: 240,
        background: "rgba(255,255,255,0.95)",
        padding: 0
    }
}));

const DrawerPaper = styled("div")(({ theme }) => ({
    width: "100%",
    background: "rgba(255,255,255,0.95)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
}));

const DrawerLogoBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
}));

const DrawerLogoText = styled(Typography)(({ theme }) => ({
    color: "#000",
    fontFamily: "Orbitron",
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 1,
}));

const DrawerActionButtonBox = styled(Box)(({ theme }) => ({
    marginTop: "auto",
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default function Navbar(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <>
            <ElevationScroll {...props}>
                <StyledAppBar position="fixed">
                    <StyledToolbar>
                        <LogoBox>
                            <Link href="/">
                                <img src={logo} alt="logo" />
                            </Link>
                        </LogoBox>

                        <CenterLinks>
                            {navLinks.map((link) => (
                                <NavButton
                                    key={link.label}
                                    href={link.href}
                                >
                                    {link.label}
                                </NavButton>
                            ))}
                        </CenterLinks>

                        {/* Right Button */}
                        <RightButtonBox>
                            <ActionButton startIcon={<img src={chrome} alt="chrome" />} variant="contained">
                                add to chrome
                            </ActionButton>
                        </RightButtonBox>

                        {/* Burger Menu (xs/sm) */}
                        <BurgerMenuBox>
                            <IconButton
                                edge="end"
                                aria-label="menu"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon sx={{ color: "#000" }} />
                            </IconButton>
                        </BurgerMenuBox>
                    </StyledToolbar>
                </StyledAppBar>
            </ElevationScroll>
            <DrawerWithStyles
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{ component: DrawerPaper }}
            >
                <DrawerPaper>
                    <DrawerLogoBox>
                        <LogoImgDrawer src={logoNoText} alt="Logo" />
                        <DrawerLogoText variant="h6">
                            Job Jarvis
                        </DrawerLogoText>
                    </DrawerLogoBox>
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.label} disablePadding>
                                <ListItemButton component="a" href={link.href} onClick={handleDrawerToggle}>
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <DrawerActionButtonBox>
                        <ActionButton fullWidth startIcon={<img src={chrome} alt="chrome" />} variant="contained">
                            add to chrome
                        </ActionButton>
                    </DrawerActionButtonBox>
                </DrawerPaper>
            </DrawerWithStyles>
        </>
    );
}