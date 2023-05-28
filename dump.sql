--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unit-test-demo; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "unit-test-demo";


SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: unit-test-demo; Owner: -
--

CREATE TABLE "unit-test-demo"."user" (
    id bigint NOT NULL,
    user_name character varying(50),
    email character varying(100) NOT NULL,
    password character varying(2024) NOT NULL,
    date_of_birth date,
    phone_number character varying(50)
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: unit-test-demo; Owner: -
--

CREATE SEQUENCE "unit-test-demo".user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: unit-test-demo; Owner: -
--

ALTER SEQUENCE "unit-test-demo".user_id_seq OWNED BY "unit-test-demo"."user".id;


--
-- Name: user id; Type: DEFAULT; Schema: unit-test-demo; Owner: -
--

ALTER TABLE ONLY "unit-test-demo"."user" ALTER COLUMN id SET DEFAULT nextval('"unit-test-demo".user_id_seq'::regclass);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: unit-test-demo; Owner: -
--

ALTER TABLE ONLY "unit-test-demo"."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: unit-test-demo; Owner: -
--

ALTER TABLE ONLY "unit-test-demo"."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

