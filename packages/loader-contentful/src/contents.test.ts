import { loadJson, getMockClient } from "./test";
import { Website } from "./types";
import {
  GetWebsites,
  GetWebsite,
  GetPage,
  GetAuthor,
  GetArticle
} from "./contents";

describe("Contents loading from ", () => {
  it("Should load Websites", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          content_type: "rendr_website",
          limit: 100,
          skip: 0
        });

        return loadJson(`${__dirname}/__fixtures__/contents/websites.json`);
      }
    });

    expect(await GetWebsites(client)).toMatchSnapshot();
  });

  it("Should return existing website ", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          content_type: "rendr_website",
          limit: 100,
          skip: 0
        });

        return loadJson(`${__dirname}/__fixtures__/contents/websites.json`);
      }
    });

    expect(await GetWebsite(client, "ekino.com")).toMatchSnapshot();
  });

  it("Should return non existing website ", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          content_type: "rendr_website",
          limit: 100,
          skip: 0
        });

        return loadJson(`${__dirname}/__fixtures__/contents/websites.json`);
      }
    });

    try {
      await GetWebsite(client, "foobar.com");
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("Should raise an exception as no page will be found", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          "fields.path": "/",
          "fields.website": "632kl7enPots4PISSnD6DV",
          limit: 1,
          content_type: "rendr_page"
        });

        return loadJson(
          `${__dirname}/__fixtures__/contents/empty_collection.json`
        );
      }
    });

    const website: Website = {
      id: "632kl7enPots4PISSnD6DV",
      name: "ekino",
      domains: ["ekino.com"],
      path: "/",
      culture: "en_GB",
      countryCode: "GDB",
      order: 0,
      enabled: true
    };

    try {
      await GetPage(client, website, "/");
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("Should return existing page ", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          "fields.path": "/",
          "fields.website": "632kl7enPots4PISSnD6DV",
          limit: 1,
          content_type: "rendr_page"
        });

        return loadJson(`${__dirname}/__fixtures__/contents/pages.json`);
      }
    });

    const website: Website = {
      id: "632kl7enPots4PISSnD6DV",
      name: "ekino",
      domains: ["ekino.com"],
      path: "/",
      culture: "en_GB",
      countryCode: "GDB",
      order: 0,
      enabled: true
    };

    expect(await GetPage(client, website, "/")).toMatchSnapshot();
  });

  it("should return an Author", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          content_type: "rendr_author",
          "fields.slug": "thomas-rabaix",
          limit: 2
        });

        return loadJson(`${__dirname}/__fixtures__/contents/authors.json`);
      }
    });

    expect(await GetAuthor(client, "thomas-rabaix")).toMatchSnapshot();
  });

  it("should return an error with Author (duplicate slug)", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        expect(query).toEqual({
          content_type: "rendr_author",
          "fields.slug": "thomas-rabaix",
          limit: 2
        });

        return loadJson(
          `${__dirname}/__fixtures__/contents/duplicate_authors.json`
        );
      }
    });

    try {
      await GetAuthor(client, "thomas-rabaix");
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });

  it("should return an article", async () => {
    const client = getMockClient({
      getEntries: async <T>(query?: any) => {
        query["fields.published_at[lte]"] = "fail to mock the date...";

        expect(query).toEqual({
          content_type: "rendr_article",
          "fields.published_at[lte]": "fail to mock the date...",
          "fields.slug": "headless-cms-challenge",
          limit: 2
        });

        return loadJson(`${__dirname}/__fixtures__/contents/article.json`);
      }
    });

    expect(
      await GetArticle(client, "headless-cms-challenge")
    ).toMatchSnapshot();
  });
});
