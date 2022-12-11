-- DELETE FROM sale_receipt sr
-- WHERE sr.id = 'd303bace-754a-4072-8874-6a7ce9d131e5';
--
-- DELETE FROM sale_receipt_include sri
-- WHERE sri.salereceiptid = 'd303bace-754a-4072-8874-6a7ce9d131e5';
-- SELECT COUNT(sr.id) as countId FROM sale_receipt sr;


CREATE OR REPLACE FUNCTION getTotalPrice(receiptId uuid) RETURNS DECIMAL(10, 2)
AS
$$
BEGIN
    return (select SUM(price * amount) as totalPrice
            from (select salereceiptid, bookid, price, amount
                  from book
                           natural join sale_receipt_include sri) as bl
            where bl.salereceiptid = receiptId);
END;
$$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION getAllSaleReceipts()
--     RETURNS TABLE(
--         id  uuid,
--         createDate  timestamp,
--         cashier VARCHAR(255),
--         total	DECIMAL(10,2)
--     )
-- AS $$
-- BEGIN
--     return QUERY SELECT sr.id,
--        					sr.createddate,
--        					(SELECT employeename
--                    		FROM Employee as e
--                    		WHERE e.employeeid = sr.CreatedEmployeeId) as cashier,
--         				(SELECT getTotalPrice(sr.id)) as total
-- 				FROM Sale_receipt as sr;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE function listBookFromReceipt(receiptId uuid)
    RETURNS TABLE
            (
                bookName  VARCHAR(150),
                isbn      BIGINT,
                unitPrice DECIMAL(10, 2),
                quantity  INT
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT c.name, c.isbn, c.price AS unitPrice, c.amount AS quantity
        FROM (sale_receipt_include sri NATURAL JOIN book b) as c
        WHERE salereceiptid = receiptId;
END;
$$ LANGUAGE plpgsql;

-- select * from listbookfromreceipt('d303bace-754a-4072-8874-6a7ce9d131e6');

-- DROP FUNCTION getReceiptById(VARCHAR(255));

create function get_sale_receipt_by_id(_id uuid)
    returns TABLE
            (
                id                uuid,
                createddate       timestamp,
                createdemployeeid integer,
                price             DECIMAL(10, 2)
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM Sale_receipt
        WHERE sale_receipt.id = _id;
END;
$$;

create function get_import_receipt_by_id(_id uuid)
    returns TABLE
            (
                id                uuid,
                createddate       timestamp,
                createdemployeeid integer,
                price             DECIMAL(10, 2)
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM import_receipt
        WHERE import_receipt.id = _id;
END;
$$;



CREATE OR REPLACE FUNCTION getBookInReceipt(receiptId VARCHAR(255))
    RETURNS TABLE
            (
                bid      BIGINT,
                quantity INT
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT bookId as id, amount
        FROM Sale_receipt_Include
        WHERE salereceiptid = CAST(receiptId as uuid)
        ORDER BY bookId;
END;
$$ LANGUAGE plpgsql;


-- ------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_revenue_in_month(_year varchar, _month varchar)
    RETURNS TABLE
            (
                revenue numeric
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT sum(price) AS revenue
        FROM sale_receipt
        WHERE extract(month from createddate) = _month::numeric
          AND extract(year from createddate) = _year::numeric;
END
$$
    LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION get_receipts_of_time(_year VARCHAR, _month VARCHAR)
    RETURNS SETOF sale_receipt
AS
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM sale_receipt
        WHERE extract(month FROM createddate) = _month::NUMERIC
          AND extract(year FROM createddate) = _year::NUMERIC;
END
$$
    LANGUAGE plpgsql;

create or replace function category_statistic(_year VARCHAR, _month VARCHAR)
    returns table
            (
                book_type varchar,
                quantity  numeric
            )
as
$$
begin
    return query
        SELECT type as book_type, SUM(amount::numeric) as quantity
        FROM (SELECT json_array_elements(items) ->> 'book_id' AS item, json_array_elements(items) ->> 'amount' AS amount
              FROM get_receipts_of_time(_year, _month)) AS receipt_items
                 LEFT JOIN book ON item = book.id
        GROUP BY type;
end
$$
    language plpgsql;